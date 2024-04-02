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
                bat 'pip install -r backend/requirements.txt'
            }
        }
        stage('Test') {
            steps {
                // Run the test
                bat 'python backend/tests/test_user_routes.py'
                bat 'python backend/tests/test_course_routes.py'
                bat 'python backend/tests/test_lecture_routes.py'
                bat 'python backend/tests/test_review_routes.py'
            }
        }
    }
}
