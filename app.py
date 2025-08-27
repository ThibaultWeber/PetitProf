from flask import Flask, request, jsonify, send_from_directory
import os
from courbe import TraceurCourbe
import matplotlib.pyplot as plt

app = Flask(__name__)
UPLOAD_FOLDER = 'static/graph'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

@app.route('/index.html')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/cours-particuliers-page.html')
def cours_particuliers():
    return send_from_directory('static', 'cours-particuliers-page.html')

@app.route('/cours-en-ligne-page.html')
def cours_en_ligne():
    return send_from_directory('static', 'cours-en-ligne-page.html')

@app.route('/contact-page.html')
def contact():
    return send_from_directory('static', 'contact-page.html')

@app.route('/fiches-methodes.html')
def fiches_methodes():
    return send_from_directory('static', 'fiches-methodes.html')

@app.route('/outils-maths.html')
def outils_maths():
    return send_from_directory('static', 'outils-maths.html')

@app.route('/youtube-page.html')
def youtube_page():
    return send_from_directory('static', 'youtube-page.html')

@app.route('/calculatrice-graphique.html')
def calculatrice_graphique():
    return send_from_directory('static', 'calculatrice-graphique.html')

@app.route('/premiere-es.html')
def premiere_es():
    return send_from_directory('static', 'premiere-es.html')

@app.route('/premiere-physique.html')
def premiere_physique():
    return send_from_directory('static', 'premiere-physique.html')

@app.route('/premiere-sti2d.html')
def premiere_sti2d():
    return send_from_directory('static', 'premiere-sti2d.html')

@app.route('/seconde.html')
def seconde():
    return send_from_directory('static', 'seconde.html')

@app.route('/terminale-es.html')
def terminale_es():
    return send_from_directory('static', 'terminale-es.html')

@app.route('/terminale-physique.html')
def terminale_physique():
    return send_from_directory('static', 'terminale-physique.html')

@app.route('/terminale-sti2d.html')
def terminale_sti2d():
    return send_from_directory('static', 'terminale-sti2d.html')

@app.route('/test-images.html')
def test_images():
    return send_from_directory('static', 'test-images.html')

@app.route('/footer.html')
def footer():
    return send_from_directory('static', 'footer.html')

@app.route('/nav.html')
def nav():
    return send_from_directory('static', 'nav.html')

@app.route('/api/trace-courbe', methods=['POST'])
def trace_courbe():
    data = request.get_json()
    fonctions = data.get('fonctions')
    if not fonctions or not isinstance(fonctions, list) or len(fonctions) == 0:
        return jsonify({'success': False, 'error': 'Aucune fonction reçue.'})
    x_min = data.get('x_min', -10)
    x_max = data.get('x_max', 10)
    y_min = data.get('y_min', None)
    y_max = data.get('y_max', None)
    try:
        traceur = TraceurCourbe()
        plt.figure(figsize=(8, 5))
        ok = False
        analyses = []
        courbes_status = []
        for i, f in enumerate(fonctions[:5]):
            res = traceur.tracer_fonction(f, x_min=x_min, x_max=x_max)
            if res:
                ok = True
                if traceur.fonctions and 'analyse' in traceur.fonctions[-1]:
                    analyses.append(traceur.fonctions[-1]['analyse'])
                courbes_status.append({'success': True, 'error': '', 'index': i})
            else:
                analyses.append(None)
                courbes_status.append({'success': False, 'error': 'La courbe ne peut être tracée car il y a une erreur dans la formule.', 'index': i})
        def configurer_graphique_sans_analyse(traceur, x_min, x_max):
            plt.grid(True, alpha=0.3)
            plt.axhline(y=0, color='black', linewidth=0.5)
            plt.axvline(x=0, color='black', linewidth=0.5)
            plt.xlabel('x', fontsize=12)
            plt.ylabel('y', fontsize=12)
            plt.title('Tracé de courbes mathématiques', fontsize=14, fontweight='bold')
            if traceur.fonctions:
                plt.legend(loc='best')
            plt.xlim(x_min, x_max)
            plt.autoscale(axis='y')
        configurer_graphique_sans_analyse(traceur, x_min, x_max)
        if y_min is not None and y_max is not None:
            plt.ylim(y_min, y_max)
        elif y_min is not None:
            plt.ylim(bottom=y_min)
        elif y_max is not None:
            plt.ylim(top=y_max)
        if not ok:
            return jsonify({'success': False, 'error': 'Impossible de tracer les fonctions.'})
        image_path = os.path.join(UPLOAD_FOLDER, 'courbe.png')
        plt.savefig(image_path, bbox_inches='tight')
        plt.close()
        analyse_html = ""
        if analyses:
            analyse_html = '<div class="analyse-math-block"><h3>📊 Analyse mathématique complète</h3>'
            for i, analyse in enumerate(analyses):
                if analyse is None:
                    continue
                analyse_html += f'<div class="analyse-fonction"><b>🎯 Fonction {i+1} : y = {fonctions[i]}</b><ul>'
                analyse_html += f'<li><b>📐 Domaine de définition :</b> {analyse["domaine"]}</li>'
                analyse_html += f'<li><b>🔢 Dérivée :</b> y&#8242; = {analyse["derivee"]}</li>'
                analyse_html += f'<li><b>📈 Primitive :</b> ∫y dx = {analyse["primitive"]}</li>'
                analyse_html += f'<li><b>🔄 Parité :</b> {analyse["parite"]}</li>'
                analyse_html += f'<li><b>📊 Monotonie :</b> {analyse["monotonie"]}</li>'
                analyse_html += f'<li><b>🎯 Zéros :</b> {analyse["zeros"]}</li>'
                analyse_html += f'<li><b>🌌 Limites :</b> x→+∞: {analyse["limites"]["+∞"]}, x→-∞: {analyse["limites"]["-∞"]}</li>'
                analyse_html += '</ul></div>'
            analyse_html += '</div>'
        return jsonify({'success': True, 'image_url': '/static/graph/courbe.png', 'analyse_html': analyse_html, 'courbes_status': courbes_status})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/static/graph/<filename>')
def serve_graph(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

@app.route('/capes.html')
def capes():
    return send_from_directory('static', 'capes.html')

@app.route('/classe-preparatoire.html')
def classe_preparatoire():
    return send_from_directory('static', 'classe-preparatoire.html')

if __name__ == '__main__':
    app.run(debug=True)
