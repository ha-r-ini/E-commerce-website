import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';



const Faq = ({ faqs }) => {

  const [expanded, setExpanded] = useState(false);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  return (
    <>
      {
        faqs.map((item, index) => (
          <Accordion key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            className='mt-20'>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${index}-panel1-content`}
              id={`${index}-panel1-header`}
            >
              <h3>{item.question}</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>{item.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))
      }

    </>
  )
}

export default Faq