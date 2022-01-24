import React, {useState} from "react";
import SurveyPageComponent from "../components/SurveyPage";
import CompanyPageComponent from "../components/CompanyPage";
import ReportPageComponent from "../components/ReportPage";
import axios from "axios";

const DashboardPage = () => {
    const [selectedPage, setSelectedPage] = useState("survey");

    return(
        <div>
            {selectedPage === "survey" ?
                <SurveyPageComponent
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
            {selectedPage === "company" ?
                <CompanyPageComponent
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
            {selectedPage === "report" ?
                <ReportPageComponent
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
        </div>
    );
};

export default DashboardPage;