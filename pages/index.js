// PACKAGES
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// UI
import CircularProgress from "@material-ui/core/CircularProgress";
// REDUX
import { fetchList } from "../redux/actions";
// COMPONENTS
import ResultsTable from "../components/Table/ResultsTable";

/**
 * @Component
 * The homepage (list search) wrapper
 *
 */
export default function Home() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchList(data));
  }, [dispatch]);

  return (
    <section>
      {data.loading ? (
        <div className="loading-wrapper">
          <CircularProgress />
        </div>
      ) : (
        <ResultsTable />
      )}
      <style jsx>
        {`
          .loading-wrapper {
            align-items: center;
            display: flex;
            height: 60vh;
            justify-content: center;
            width: 100%;
          }
        `}
      </style>
    </section>
  );
}
