pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                // No build steps required in this case
            }
        }
        stage('Test') {
            steps {
                // Navigate to the directory containing the tests
                dir('/backend/tests/') {
                    // Execute the tests using python command
                    bat 'python test_user_routes.py'
                }
            }
        }
    }
}
