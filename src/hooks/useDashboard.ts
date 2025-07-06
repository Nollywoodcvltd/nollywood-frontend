import { useQuery } from '@tanstack/react-query';
import { userDashboard, getDashboard, allDashboard } from '../services/profile';

export const useDashboard = (id?: string) => {
  return useQuery({
    queryKey: ["dashboardData", id],
    queryFn: id ? () => getDashboard(id) : userDashboard,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true,  
    refetchOnMount: true,      
    retry: 2,
  });
};

export const useTalents = () => {
  return useQuery({ 
    queryKey: ["talents"],
    queryFn: async () => {
      const data = await allDashboard();
      // console.log("API Response:", data); // Add this line
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true, 
    refetchOnReconnect: true,  
    refetchOnMount: true,      
    retry: 2,
  })
}
