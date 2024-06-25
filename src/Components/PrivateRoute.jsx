import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../Services/Supabase';
import { FaSpinner } from 'react-icons/fa';


const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error);
            } else {
                setSession(data.session);
            }
            setLoading(false);
        };

        getSession();
    }, []);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <FaSpinner className="spinner" style={{ fontSize: '1rem', animation: 'spin 1s linear infinite' }} />
        </div>;
    }

    return session ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;