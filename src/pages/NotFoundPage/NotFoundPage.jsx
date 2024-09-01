import { Link } from "react-router-dom";



function NotFoundPage() {
  return (
    <>
      <div className={css.box}>
        <Link className={css.link} to={"/"}>
          Go back home
        </Link>
      </div>
    </>
  );
}
export default NotFoundPage;