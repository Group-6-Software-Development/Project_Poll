import CourseCard from "../components/CourseCard";

function UserPage() {
  return (
    <div className="user-page-container">
      <h1>Courses</h1>
      <div className="card-container">
        <CourseCard />
      </div>
    </div>
  );
}
export default UserPage;
