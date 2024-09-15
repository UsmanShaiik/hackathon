from flask import Flask
from flask_cors import CORS
from AndroidManifestAnalysis import analyze_apk
#from LintAnalysis import run_lint, generate_docs, only_errors, fatal_only, baseline_analysis, config_lint
from DependencyCheck import analyze
from MOBSFAnalysis import mobsf_analysis  # Uncomment if you have this function defined

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Register routes from AndroidManifestAnalysis
app.add_url_rule('/analyze_apk', 'analyze_apk', analyze_apk, methods=['POST'])

# Register routes from LintAnalysis
# app.add_url_rule('/run-lint', 'run_lint', run_lint, methods=['POST'])
# app.add_url_rule('/generate-docs', 'generate_docs', generate_docs, methods=['POST'])
# app.add_url_rule('/only-errors', 'only_errors', only_errors, methods=['POST'])
# app.add_url_rule('/fatal-only', 'fatal_only', fatal_only, methods=['POST'])
# app.add_url_rule('/baseline-analysis', 'baseline_analysis', baseline_analysis, methods=['POST'])
# app.add_url_rule('/config-lint', 'config_lint', config_lint, methods=['POST'])

# Register routes from DependencyCheck
app.add_url_rule('/analyze', 'analyze', analyze, methods=['POST'])

# Register routes from MOBSFAnalysis
app.add_url_rule('/mobsf_analysis', 'mobsf_analysis', mobsf_analysis, methods=['POST'])

# Main function to run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
