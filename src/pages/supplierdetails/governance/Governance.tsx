import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomButton from '../../../component/buttons/CustomButton';
import DocumentCertificate from '../overview/component/document/DocumentCertificate';
import MapComponent from '../../../component/mapcomponent/MapComponent';
import Loader from '../../../component/loader/Loader';
import Nozzle from '../../../assets/images/nozzle.png';
import Gasket from '../../../assets/images/gasket.png';
import Spindle from '../../../assets/images/spindle.png';
import Bellows from '../../../assets/images/bellows.png';
import Relay from '../../../assets/images/relay.png';
import Oring from '../../../assets/images/o-ring.png';
import ValveDisc from '../../../assets/images/valve-disc.png';
import WhiteDisc from '../../../assets/images/disc-white.png';
import Motor from '../../../assets/images/motor-NS.png';
import Spring from '../../../assets/images/spring.png';
import './Governance.scss';

const Governance: React.FC = () => {
  const location = useLocation();
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedRecord = localStorage.getItem("record");
      if (storedRecord) {
        try {
          setRecord(JSON.parse(storedRecord));
        } catch (e) {
          console.error("Failed to parse record from localStorage", e);
          setRecord(null);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const type = location?.pathname.split("/")[4];

  const cards1 = [
    { title: "Management Systems", quality: "QualTech", health: "Orion", environmental: "Orion" },
    { title: "Certifications", quality: "QualTech", health: "Orion", environmental: "Orion" },
    { title: "Insurances", quality: "QualTech", health: "Orion", environmental: "Orion" }
  ];

  const miniCard = [
    { totalsystem: "10", active: "2", outdated: "8" },
  ];

  const getImage = (name?: string) => {
    if (!name) return '';
    switch (name.toLowerCase()) {
      case 'nozzle':
        return Nozzle;
      case 'gasket':
        return Gasket;
      case 'spindle':
        return Spindle;
      case 'bellows':
        return Bellows;
      case 'relay':
        return Relay;
      case 'o-ring':
        return Oring;
      case 'valve disc':
        return ValveDisc;
      case 'motor':
        return Motor;
      case 'compression spring':
        return Spring;
      case 'disc':
        return WhiteDisc;
      default:
        return '';
    }
  };

  return (
    <div className='goverance-flex'>
      {type === "governance" &&
        <div className='direction-card'>
          {cards1.map((item) => (
            <div className='governance-main' key={item.title}>
              <div className='governance-content'>
                <div className='con-title'>{item.title}</div>

                {item.title === "Management Systems" && (
                  <>
                    <div className='governance-con-start'>
                      <div>Quality</div>
                      <div className='governance-items'>{item.quality}</div>
                    </div>
                    <div className='governance-con-start'>
                      <div>Environmental</div>
                      <div className='governance-items'>{item.environmental}</div>
                    </div>
                    <div className='governance-con-start'>
                      <div>Health</div>
                      <div className='governance-items'>{item.health}</div>
                    </div>
                  </>
                )}

                {item.title === "Certifications" && Array.isArray(record?.certification) && (
                  <div className='certification-main'>
                    {record.certification.map((cert: any, idx: number) => (
                      <div key={cert?.id || cert?.name || idx} className='certificate-div'>
                        <div className='certificate-certi'>{cert?.certificate}</div>
                        <div className='certificate-name'>{cert?.name}</div>
                        <div className='certificate-name'>{cert?.expire_date}</div>
                      </div>
                    ))}
                  </div>
                )}

                {item.title === "Insurances" && Array.isArray(record?.insurance) && (
                  <div className='certification-main'>
                    {record.insurance.map((ins: any, idx: number) => (
                      <div key={ins?.id || ins?.name || idx} className='certificate-div'>
                        <div className='certificate-certi'>{ins?.name}</div>
                        <div className='certificate-name'>{ins?.amount}</div>
                        <div className='certificate-name'>{ins?.expire_date}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {type === "governance" &&
                <div className='governance-overview'>
                  <div className='over-title'>Overview</div>
                  {miniCard.map((m) => (
                    <div key={m.outdated}>
                      <div className='text-bottom'>Total Systems: {m.totalsystem}</div>
                      <div className='text-bottom'> Active Systems: {m.active}</div>
                      <div className='text-bottom'>Outdated Systems: {m.outdated}</div>
                    </div>
                  ))}
                  <CustomButton label='View More' type='primary' />
                </div>
              }
            </div>
          ))}
        </div>
      }

      {type === "location" && (
        <div className='location-main'>
          <div className="governance-main">
            <div className="governance-content-location">
              <div className="location-head">{record?.supplier}</div>
              <div className="governance-con-start-loc">
                <div className="location-field">Location :</div>
                <div>{record?.location}</div>
              </div>
              <MapComponent location={record?.location} />
            </div>
          </div>
        </div>
      )}

      {type === "company" &&
        <div className='governance-main'>
          <div className='governance-content'>
            <div className='con-title-com'>{record?.supplier}</div>
            <div className='governance-con-start-com'>
              <div className='company-bold'>Industry</div>
              <div className='company-bold'>{record?.industry}</div>
              <p className='parah-com'>{record?.aboutUs}</p>
            </div>
            <div className='governance-con-start-com'>
              <div className='company-bold'>Contact Us</div>
              <div className='prod-list'>Email: {record?.email}</div>
              <div className='prod-list'>Contact No: {record?.contactUs}</div>
            </div>
          </div>
        </div>
      }

      {type === "products&services" && (
        <div className='prd-main'>
          {record?.key === "nakakita" ? (
            <div className="governance-main-item">
              {Array.isArray(record?.product) && record.product.map((prod: any) => (
                <div key={prod?.key ?? prod?.name ?? Math.random()} className="product-item">
                  <div className='product-item-img'>
                    {getImage(prod?.name) ? (
                      <img src={getImage(prod?.name)} width={160} alt={prod?.name ?? 'product'} />
                    ) : null}
                  </div>

                  <div className='product-item-content'>
                    <div>
                      <div className="product-item-un">
                        <div>UNSPSC: {prod?.unspsc ?? '-'}</div>
                        <div>HSN: {prod?.hsn ?? '-'}</div>
                      </div>
                      <div className='product-item-address'>{prod?.productAdress ?? '-'}</div>
                      <div>SKU: {prod?.sku ?? '-'}</div>
                      <div>Mfg: {prod?.Mfg ?? '-'}</div>
                      <div>Location: {prod?.location ?? '-'}</div>
                    </div>
                  </div>

                  <div className='product-item-details'>
                    <div className='name-details'>
                      <span>Name:</span>
                      <span className='prod-name'>{prod?.name ?? '-'}</span>
                    </div>
                    <div className='meterial-details'>
                      <span>Material:</span>
                      <span className='prod-material'>{prod?.material ?? '-'}</span>
                    </div>
                    <div className='app-details'>
                      <span>Application:</span>
                      <span className='prod-application'>{prod?.application ?? '-'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="governance-main-prod">
              <div className="governance-content-prod">
                <div className="con-title">{record?.supplier}</div>

                <div className="governance-con-start">
                  <div className='prod-head'>Industry</div>
                  <div className='prod-space'>{record?.industry}</div>
                </div>

                {Array.isArray(record?.product) && record.product.length > 0 && (
                  <div className="governance-con-start-prod">
                    <div className="prod-head">Products</div>
                    {record.product.map((prod: any, idx: number) => (
                      <div className='prod-list' key={prod?.key ?? prod?.name ?? idx}>
                        {typeof prod === "string" ? prod : (prod?.name ?? JSON.stringify(prod))}
                      </div>
                    ))}
                  </div>
                )}

                {Array.isArray(record?.service) && record.service.length > 0 && (
                  <div className="governance-con-start-prod">
                    <div className='prod-head'>Services</div>
                    {record.service.map((serv: any, index: number) => (
                      <div className='prod-list' key={serv?.id ?? serv?.name ?? index}>
                        {typeof serv === "string" ? serv : (serv?.name ?? JSON.stringify(serv))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className='doc-certi'>
        <DocumentCertificate record={record} />
      </div>
    </div>
  );
};

export default Governance;
