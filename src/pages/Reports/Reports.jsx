
import "./Reports.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";


function Reports(){


return(


<div className="dashboard">


<Sidebar />



<div className="main-content">


<Navbar />



<div className="reports-container">



<h2>
Hospital Reports & Analytics
</h2>




<div className="report-cards">



<div className="report-card">

<h3>
👥 Total Patients
</h3>

<p>
120
</p>

</div>





<div className="report-card">

<h3>
👨‍⚕️ Total Doctors
</h3>

<p>
25
</p>

</div>






<div className="report-card">

<h3>
📅 Appointments
</h3>

<p>
340
</p>

</div>






<div className="report-card">

<h3>
📁 Medical Records
</h3>

<p>
560
</p>

</div>





</div>





<div className="chart-section">


<h3>
Appointment Overview
</h3>



<div className="chart-box">


<div className="bar">

<span>
Monday
</span>

<div className="bar-fill monday"></div>

</div>




<div className="bar">

<span>
Tuesday
</span>

<div className="bar-fill tuesday"></div>

</div>





<div className="bar">

<span>
Wednesday
</span>

<div className="bar-fill wednesday"></div>

</div>






<div className="bar">

<span>
Thursday
</span>

<div className="bar-fill thursday"></div>

</div>






<div className="bar">

<span>
Friday
</span>

<div className="bar-fill friday"></div>

</div>



</div>


</div>





</div>


</div>


</div>


);


}


export default Reports;
