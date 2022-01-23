import React, {useState} from "react";
import SurveyPageComponent from "../components/SurveyPage";
import CompanyPageComponent from "../components/CompanyPage";
import ReportPageComponent from "../components/ReportPage";

const DashboardPage = () => {
    const [selectedPage, setSelectedPage] = useState("survey");

    return(
        <div>
            {selectedPage === "survey" ?
                <SurveyPageComponent
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
            {selectedPage === "company" ?
                <CompanyPageComponent
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
            {selectedPage === "report" ?
                <ReportPageComponent
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                />
                :
                null
            }
        </div>
    );
};

export default DashboardPage;