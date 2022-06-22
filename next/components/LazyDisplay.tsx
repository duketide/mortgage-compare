import dynamic from "next/dynamic";

const LazyDisplay = dynamic(() => import("./Display"), {ssr: false});

export default LazyDisplay;