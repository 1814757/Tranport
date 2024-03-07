import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import de from 'date-fns/locale/de'; // Importieren der deutschen Lokalisierung
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

registerLocale('de', de); // Registrieren der deutschen Lokalisierung

export default function App() {
  const [date, setDate] = useState(new Date());
  const [blockedTimes, setBlockedTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetchBlockedTimes();
  }, []);

  const fetchBlockedTimes = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/api/v1/home/appointments"
      );
      const appointments = response.data.appointments;
      console.log("Appointments:", appointments);
      setBlockedTimes(appointments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const isTimeBlocked = (time) => {
    const key = formatDate(date);
    const blockedTimesForDate = blockedTimes[key] || [];
    return blockedTimesForDate.some(blockedTime => 
      blockedTime.getHours() === time.getHours() && 
      blockedTime.getMinutes() === time.getMinutes());
  };
  
  const handleTimeChange = async (time) => {
    const key = formatDate(date);
    const updatedBlockedTimes = { ...blockedTimes };
    
    if (!updatedBlockedTimes[key]) {
      updatedBlockedTimes[key] = [];
    }
  
    updatedBlockedTimes[key].push(time); // Fügen Sie die spezifische Zeit hinzu, nicht alle Zeiten des Tages.
    setBlockedTimes(updatedBlockedTimes);
  
    try {
      console.log("Selected time: ", time);
      // Stellen Sie sicher, dass das Datum und die Zeit korrekt formatiert und übermittelt werden.
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/home/create-appointment",
        { date: time } // Übermitteln Sie das vollständige Datum-Zeit-Objekt, nicht nur das Datum.
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const formatDate = (date) => {
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
  };

  const filterTime = (time) => {
  
    return !isTimeBlocked(time);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="form container page">
        <div className="pt-3">
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleTimeChange(date);
            }}>
              <DatePicker
                locale="de"
                showTimeSelect
                minTime={new Date(0, 0, 0, 9, 0)}
                maxTime={new Date(0, 0, 0, 21, 0)}
                selected={date}
                onChange={setDate}
                filterTime={filterTime}
                
                timeInputLabel="Zeit:"
                dateFormat="dd.MM.yyyy HH:mm"
              />
              <div>
                <input
                  type="radio"
                  value="X"
                  checked={selectedOption === "X"}
                  onChange={handleOptionChange}
                />
                <label>X</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Y"
                  checked={selectedOption === "Y"}
                  onChange={handleOptionChange}
                />
                <label>Y</label>
              </div>
              <div>
                <input
                  type="radio"
                  value="Z"
                  checked={selectedOption === "Z"}
                  onChange={handleOptionChange}
                />
                <label>Z</label>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isTimeBlocked(date) || loading}
              >
                Termin buchen 
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
