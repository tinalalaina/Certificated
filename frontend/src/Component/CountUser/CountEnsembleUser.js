import React, { useEffect, useState } from 'react'
import axios from 'axios';

function CountEnsembleUser() {
    const [projectCount, setProjectCount] = useState(0);
useEffect(() => {
        fetchProjectCount();
    }, []);
    const fetchProjectCount = async () => {
        try {
            const response = await axios.get('http://localhost/dashboardmistral1/count_user.php');
            if (response.data.success) {
                setProjectCount(response.data.count);
            }
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div>
        <div class="card">
            <div class="card-header p-3 pt-2 colorensembleutilisateur">
            <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <h3>Utilisateur normal</h3>
              </div>
              <div class="text-end pt-1">
                <br/>
                <hr/>
                 <h2 class="mb-0">{projectCount}</h2>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CountEnsembleUser;