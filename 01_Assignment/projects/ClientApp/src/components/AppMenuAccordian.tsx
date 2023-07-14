import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
} from "@chakra-ui/react";

import { MdDashboard } from "react-icons/md";
import AppMenuItem from "./AppMenuItem";

interface props {
  headerText: string;
  headerIcon: React.ReactNode;
  items: AccordianItems[];
}

export interface AccordianItems {
  text: string;
  icon: React.ReactNode; // todo add action
}

const AppMenuAccordian = ({ headerIcon, headerText, items }: props) => {
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <AccordionButton>
          <HStack>
            <AppMenuItem icon={headerIcon} text={headerText} />
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          {items?.map((item) => (
            <AppMenuItem icon={item.icon} text={item.text} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AppMenuAccordian;
