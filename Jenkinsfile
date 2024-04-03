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
                        sh 'coverage run backend/tests/test_user_routes.py'
                        sh 'coverage run backend/tests/test_course_routes.py'
                        sh 'coverage run backend/tests/test_lecture_routes.py'
                        sh 'coverage run backend/tests/test_review_routes.py'
                        sh 'coverage combine' // Combine coverage data from all tests
                        sh 'coverage html -d coverage_report' // Generate HTML coverage report
                    } else {
                        bat 'coverage run backend/tests/test_user_routes.py'
                        bat 'coverage run backend/tests/test_course_routes.py'
                        bat 'coverage run backend/tests/test_lecture_routes.py'
                        bat 'coverage run backend/tests/test_review_routes.py'
                        bat 'coverage combine' // Combine coverage data from all tests
                        bat 'coverage html -d coverage_report' // Generate HTML coverage report
                    }
                }
            }
        }
    }
}
