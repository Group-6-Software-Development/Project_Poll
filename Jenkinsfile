pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Group-6-Software-Development/Project_Poll.git']])
            }
        }
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/Group-6-Software-Development/Project_Poll.git'
                sh 'python3 test_user_routes.py'
            }
        }
        stage('Test') {
            steps {
                sh 'python3 -m pytest'
            }
        }
    }
}
