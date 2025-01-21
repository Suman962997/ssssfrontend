import React from "react";
import './DocumentCertificate.scss';
import { CertificateIcon } from "../../../../../utils/CardIcons";
interface DocProps {
  record?: any
}
const DocumentCertificate: React.FC<DocProps> = ({ record }) => {
  console.log(record?.certification, 'recssord')
  const certifications =
    // record?.key === "nakakita"
    //   ? [
    //     [
    //       { name: "environment management system", description: "ISO 9001 (LRQA)" },
    //       { name: "health&safety management system", description: "CE Marking (LRQA)" },
    //       { name: "quantity management system", description: "Eco Action 21 Initiative" }
    //     ]

    //   ]
    [
      { name: "ISO9001", description: "Quality Management" },
      { name: "ISO45001", description: "Environment Management" },
      { name: "ISO19845", description: "Health & Safety Management" },
      { name: "ISO55001", description: "Information Security" },
    ]

  return (
    <div className="document-certificate">
      <h4>Certification</h4>
      <ul>
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card">
            <div>
              <CertificateIcon />
            </div>
            <div className="cert-name">{cert.name}</div>
            <div className="cert-desc">{cert.description}</div>
          </div>
        ))}
      </ul>
      <button className="view-more">View More</button>
      <div className="certify-text">All certificates and Policies are up to date</div>
    </div>
  );
};

export default DocumentCertificate;
