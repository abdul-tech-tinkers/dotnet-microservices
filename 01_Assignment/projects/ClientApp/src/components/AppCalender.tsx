import { Box, HStack } from "@chakra-ui/react";
import { MdCalendarMonth } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  startDate: Date;
  onDateSelected: (date: Date) => void;
}
const AppCalender = ({ onDateSelected, startDate = new Date() }: Props) => {
  return (
    <Box borderWidth={1} borderRadius={5} p={1}>
      <HStack>
        <Box ml={1.5}>
          <MdCalendarMonth />
        </Box>
        <DatePicker 
          ml={1}
          selected={startDate}
          onChange={(date) => onDateSelected(date)}
        />
      </HStack>
    </Box>
  );
};

export default AppCalender;
