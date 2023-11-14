import { ToastContainer } from "react-toastify";
export const metadata = {
    title: 'Survey | ChattyTicket',
    description: 'Participate in a survey to help us improve our service',
  }
  
  export default async function SurveyLayout(props: {
    children: React.ReactNode 
  }) {
  
    return (
        <>
          {props.children}
            <ToastContainer
                autoClose={1000}
                icon
                position="bottom-right"
                pauseOnHover
                closeOnClick
                
            />
        </>
       
    )
  }
  