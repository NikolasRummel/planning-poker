import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <div className="pb-8 text-center">
            <Link legacyBehavior href={"/about"}>
                <a className="text-blue-500 hover:underline">Privacy Policy & Imprint</a>
            </Link>
        </div>
    );
};

export default Footer;
