import React, { useState } from 'react';
import { ReactComponent as ShareIcon } from '../../assets/icons/ShareIcon.svg';
import {
    EmailShareButton,
    EmailIcon,
} from 'react-share';
import { FaCopy, FaCheck } from "react-icons/fa";
import './ShareSocial.scss';
import { Tooltip } from 'antd';

export const ShareComponent: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const url = "http://192.168.2.72:3000/";
    const title = "Check out this amazing content!";
    const link = "http://localhost:3001/"
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    const handleCopy = async () => {
        try {
            await navigator.clipboard?.writeText(link);
            setCopied(true);

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };
    return (
        <div>
            <Tooltip
                color="#f8f8f8"
                title={
                    <div className="modal-overlay" role='button' onClick={toggleModal}>
                        <div className="modal-content" role='button' onClick={(e) => e.stopPropagation()}>
                            <div className='modal-header'>
                                <div className='share'>Share</div>
                                <div className="copy-link" role='button' onClick={handleCopy}>
                                    {copied ? (
                                        <>
                                            <FaCheck className="icon" /> Copied
                                        </>
                                    ) : (
                                        <>
                                            <FaCopy className="icon" /> Copy Link
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="share-options">
                                <div className='share-flex'>
                                    <div className='share-email'>
                                        <EmailShareButton url={url} title={title}>
                                            <EmailIcon size={32} round />   <div>Email</div>
                                        </EmailShareButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
                placement="bottom"
                className="custom-tooltip"
            >
                <div className="shareIcon" onClick={toggleModal}>
                    <ShareIcon />
                    <div>Share</div>
                </div>
            </Tooltip>

        </div>
    );
};
