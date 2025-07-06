import { BsTrashFill } from "react-icons/bs";
import { useDashboard } from "../../../../hooks/useDashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
import { toast } from "react-toastify";
import { deleteFilmography, deleteAwards } from "../../../../services/profile";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { token } from "../../../../services/profile";

export interface SummaryItem {
  _id: string;
  summary?: string;
}

export interface FilmographyItem {
  _id: string;
  title: string;
  year: string;
  genre: string;
  productionCompany: string;
  role: string;
  castName: string;
  location: string;
  link: string;
}

export interface AwardItem {
  _id: string;
  title: string;
  type: string;
  year: string;
  link: string;
}

function DashboardCareer() {
  const { id } = useParams();
  const { data: dashboardData, refetch } = useDashboard(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Delete filmography mutation
  const deleteMutation = useMutation({
    mutationFn: deleteFilmography,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      toast.success("Filmography deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete filmography");
      console.error(error);
    },
  });

  const deleteAwardMutation = useMutation({
    mutationFn: deleteAwards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      toast.success("Award deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete award");
      console.error(error);
    },
  });

  const handleDeleteFilmography = (id: string) => {
    console.log("Attempting to delete filmography with ID:", id);

    if (
      window.confirm("Are you sure you want to delete this filmography entry?")
    ) {
      // console.log("Confirmed deletion for ID:", id);
      deleteMutation.mutate(id);
    } else {
      alert("Deletion cancelled");
    }
  };

  const handleDeleteAward = (id: string) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      deleteAwardMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="user">
        <h2 className="text-capitalize">
          <span className="text-capitalize">
            {dashboardData?.profile?.firstName}
          </span>{" "}
          <span className="text-capitalize">
            {dashboardData?.profile?.lastName}
          </span>
        </h2>
        <h6 className="text-capitalize">{dashboardData?.profile?.role}</h6>
      </div>

      <div className="address profession mt-4 mb-5">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          Professional Summary
        </h6>
        {dashboardData?.user?.premium ? (
          <div className="mt-2 pt-3">
            {dashboardData?.professions?.map((item: SummaryItem) => (
              <div key={item?._id}>{item?.summary}</div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="filmography mb-5">
        <h6 className="text-capitalize pb-2">Filmography</h6>
        {dashboardData?.user?.premium ? (
          <div>
            {dashboardData?.filmography?.map((item: FilmographyItem) => (
              <div
                key={item._id}
                className="mt-2 border-top pt-3 mb-5 border-warning border-1 position-relative"
              >
                <div className="address">
                  <h5>Title: {item.title}</h5>
                  <h5>Year: {item.year}</h5>
                  <h5>Genre: {item.genre}</h5>
                  <h5>Production Company: {item.productionCompany}</h5>
                  <h5>Role: {item.role}</h5>
                  <h5>Credit: {item.castName}</h5>
                  <h5>Location: {item.location}</h5>
                  <h5>
                    Link:{" "}
                    <a
                      className="text-warning"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </h5>
                </div>
                {!id ? (
                  <button
                    onClick={() => handleDeleteFilmography(item?._id)}
                    className="btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <BsTrashFill size={20} />
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="awards address mt-4 mb-4">
        <h6 className="text-capitalize border-bottom pt-3 border-warning border-1 pb-2">
          Awards
        </h6>
        {dashboardData?.user?.premium ? (
          <div>
            {dashboardData?.awards?.map((award: AwardItem) => (
              <div key={award?._id} className="mb-3 pt-3 position-relative">
                <h5>
                  {award?.type === "true" ? "Awarded" : "Nominated"} -{" "}
                  {award?.title} <br />
                  {award?.year} <br />
                  Link:{" "}
                  <a
                    className="text-warning"
                    href={award?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {award?.link}
                  </a>{" "}
                  <br />
                </h5>
                {!id ? (
                  <button
                    onClick={() => handleDeleteAward(award?._id)}
                    className="btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2"
                    disabled={deleteAwardMutation.isPending}
                  >
                    {deleteAwardMutation.isPending ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <BsTrashFill size={20} />
                    )}
                  </button>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DashboardCareer;

{
  /* {dashboardData?.awards?.map((award: AwardItem) => (
  <div key={award?._id} className="mb-3">
    <p>
      {award?.type === "true" ? "Awarded" : "Nominated"} - {award?.title} <br />
      {award?.year} <br />
      Link: <a
          className="text-warning"
          href={award?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {award?.link}
        </a> <br />
    </p>
  </div>
))} */
}
