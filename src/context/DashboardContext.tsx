import React, { createContext, useState, ReactNode, useEffect } from "react";
import { userDashboard } from "../services/profile";

export interface DashboardContextType {
    dashboardData: any; 
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<any>(null); 
    

    useEffect(() => {
        fetchDashboardData();
    }, []);  

    const fetchDashboardData = async () => {
        try {
            const response = await userDashboard();
            if (response) {
                setDashboardData(response);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    return (
        <DashboardContext.Provider value={{ dashboardData }}>
            {children}
        </DashboardContext.Provider>
    );
};
