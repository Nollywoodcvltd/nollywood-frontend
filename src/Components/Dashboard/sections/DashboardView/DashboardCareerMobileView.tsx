import { useDashboard } from '../../../../hooks/useDashboard';
import AccordionItem from './AccordionItem';
import './Accordion.scss';
import { BsTrashFill } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteFilmography, deleteAwards } from '../../../../services/profile';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
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

export interface SocialMedia {
  _id: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

function DashboardCareerMobileView() {
  const { id } = useParams();
  const { data: dashboardData, isLoading, error, refetch } = useDashboard(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Delete filmography mutation
  const deleteFilmMutation = useMutation({
    mutationFn: deleteFilmography,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      toast.success('Filmography deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete filmography');
      console.error(error);
    },
  });

  // Delete award mutation
  const deleteAwardMutation = useMutation({
    mutationFn: deleteAwards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] });
      toast.success('Award deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete award');
      console.error(error);
    },
  });

  const handleDeleteFilmography = (id: string) => {
    if (
      window.confirm('Are you sure you want to delete this filmography entry?')
    ) {
      deleteFilmMutation.mutate(id);
    }
  };

  const handleDeleteAward = (id: string) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      deleteAwardMutation.mutate(id);
    }
  };

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error!! refresh dashboard</p>;

  // Extract skills as an array
  const skillsData = dashboardData?.skills[0]?.skills;
  const skillsArray =
    (skillsData as string)?.split(',').map((skill) => skill.trim()) || [];

  return (
    <div>
      <div className='w-100'>
        <AccordionItem title='Filmography' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div>
            {dashboardData?.filmography?.map((item: FilmographyItem) => (
              <div key={item._id} className='mb-5 address position-relative'>
                <div>
                  <h5>Title: {item.title}</h5>
                  <h5>Year: {item.year}</h5>
                  <h5>Genre: {item.genre}</h5>
                  <h5>Production Company: {item.productionCompany}</h5>
                  <h5>Role: {item.role}</h5>
                  <h5>Credit: {item.castName}</h5>
                  <h5>Location: {item.location}</h5>
                  <h5>
                    Link:{' '}
                    <a
                      className='text-warning'
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {item.link}
                    </a>
                  </h5>
                </div>
                {!id ? (
                  <button
                    onClick={() => handleDeleteFilmography(item?._id)}
                    className='btn btn-sm text-dark position-absolute top-0 end-0 mt-2 me-2'
                    disabled={deleteFilmMutation.isPending}
                  >
                    {deleteFilmMutation.isPending ? (
                      <span className='spinner-border spinner-border-sm' />
                    ) : (
                      <BsTrashFill size={20} />
                    )}
                  </button>
                ) : (
                  ''
                )}
              </div>
            ))}
            </div>
          ) : ''}
        </AccordionItem>

        <AccordionItem title='Skills' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
          <div className='address skills mt-4'>
            <ul>
              {skillsArray.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          ): ''}
        </AccordionItem>

        <AccordionItem title='Awards' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div className='address awards address mt-4 mb-4'>
              {dashboardData?.awards?.map((award: AwardItem) => (
                <div key={award?._id} className='mb-3 position-relative'>
                  <p>
                    {award?.type === 'true' ? 'Awarded' : 'Nominated'} -{' '}
                    {award?.title} <br />
                    {award?.year} <br />
                    Link:{' '}
                    <a
                      className='text-warning'
                      href={award?.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {award?.link}
                    </a>{' '}
                    <br />
                  </p>
                  {/* <p>
                    {award?.title} - {award?.type === "true" ? "Awarded" : "Nominated"} - {award?.year}
                  </p> */}
                  {!id ? (
                    <button
                      onClick={() => handleDeleteAward(award?._id)}
                      className='btn btn-sm text-black position-absolute top-0 end-0 mt-2 me-2'
                      disabled={deleteAwardMutation.isPending}
                    >
                      {deleteAwardMutation.isPending ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        <BsTrashFill size={20} />
                      )}
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              ))}
            </div>
          ): ''}
        </AccordionItem>

        <AccordionItem title='Socials' className='overflow-auto'>
          {dashboardData?.user?.premium ? (
            <div className='address socials mt-4'>
              <ul className='list-unstyled'>
                {dashboardData?.socials?.map((item: SocialMedia) => (
                  <>
                    {item?.facebook && (
                      <li className='text-warning' key={`${item?._id}-facebook`}>
                        <a className='text-warning' href={item?.facebook}>
                          facebook
                        </a>
                      </li>
                    )}
                    {item?.instagram && (
                      <li key={`${item?._id}-instagram`}>
                        <a className='text-warning' href={item?.instagram}>
                          Instagram
                        </a>
                      </li>
                    )}
                    {item?.tiktok && (
                      <li key={`${item?._id}-tiktok`}>
                        <a className='text-warning' href={item?.tiktok}>
                          Tiktok
                        </a>
                      </li>
                    )}
                    {item?.youtube && (
                      <li key={`${item?._id}-youtube`}>
                        <a className='text-warning' href={item?.youtube}>
                          Youtube
                        </a>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          ) : ''}
        </AccordionItem>
      </div>
    </div>
  );
}

export default DashboardCareerMobileView;
