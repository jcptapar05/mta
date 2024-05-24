import React from "react";
import Script from "next/script";

const SalesIq = () => {
  return (
    <Script
      type="text/javascript"
      id="zsiqchat"
      dangerouslySetInnerHTML={{
        __html: `
    var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || {widgetcode: "siq497bd4608c3df5d9162c584d52db6c40", values:{},ready:function(){}};var d=document;s=d.createElement("script");s.type="text/javascript";s.id="zsiqscript";s.defer=true;s.src="https://salesiq.zohopublic.com/widget";t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(s,t);
        `,
      }}
    ></Script>
  );
};

export default SalesIq;
