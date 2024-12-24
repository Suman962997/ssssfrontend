import { json_url } from '../../api/Api';

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
