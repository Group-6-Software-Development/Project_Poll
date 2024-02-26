import AddCourseCard from "../components/AddCourseCard";
import CourseCard from "../components/CourseCard";

function UserPage() {
  return (
    <div className="user-page-container">
      <h1>Courses</h1>
      <div className="card-container">
        <AddCourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
export default UserPage;
