import axios from 'axios';
import { endpoint, json_url } from '../../api/Api';

interface FetchSupplierListDataProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  calculateCompliancePercentages: () => void;
}

export const fetchSupplierListData = async ({
  setData,
  setLoading,
  calculateCompliancePercentages
}: FetchSupplierListDataProps) => {
  try {
    setLoading(true);
    const response = await fetch(json_url);
    const data = await response.json();
    setData(data);
    calculateCompliancePercentages();
  } catch (error) {
    console.error("Error fetching the data:", error);
  } finally {
    setLoading(false);
  }
};


export const postData = async (data: FormData, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setLoading(true);
  try {
    const response = await axios.post(`${endpoint}webscraping/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during POST call:", error);
    throw error;
  }
  finally {
    setLoading(false);
  }

};





