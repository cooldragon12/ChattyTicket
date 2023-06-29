import "./survey.css"
import SurveyForm from '@/components/Survey/Form';
import {Flex} from "@mantine/core"

export default function SurveyPage() {
    
    return (
        <>
            <div className="survey-banner">
                <h1 className="banner-text">Survey Form</h1>
            </div>
            <SurveyForm/>
        </>
    )
} 