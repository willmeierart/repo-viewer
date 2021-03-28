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

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  const {
    ui: { loading },
  } = useSelector((state) => state);

  return (
    <section>
      {loading ? (
        <div className="loading-wrapper">
          <CircularProgress />
        </div>
      ) : (
        <ResultsTable />
      )}
    </section>
  );
}
