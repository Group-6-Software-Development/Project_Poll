pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git branch: 'main', url: 'https://github.com/Group-6-Software-Development/Project_Poll.git'
            }
        }
        stage('Setup') {
            steps {
                // Install necessary dependencies
                script {
                    if (isUnix()) {
                        sh 'pip install -r backend/requirements.txt'
                    } else {
                        bat 'pip install -r backend/requirements.txt'
                    }
                }
            }
        }
        stage('Test') {
            steps {
                // Run the tests
                script {
                    if (isUnix()) {
                        sh 'python backend/tests/test_user_routes.py'
                        sh 'python backend/tests/test_course_routes.py'
                        sh 'python backend/tests/test_lecture_routes.py'
                        sh 'python backend/tests/test_review_routes.py'
                    } else {
                        bat 'python backend/tests/test_user_routes.py'
                        bat 'python backend/tests/test_course_routes.py'
                        bat 'python backend/tests/test_lecture_routes.py'
                        bat 'python backend/tests/test_review_routes.py'
                    }
                }
            }
        }
    }
}
