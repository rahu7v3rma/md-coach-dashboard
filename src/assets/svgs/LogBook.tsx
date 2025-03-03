import * as React from 'react';

interface Props {
    fill?: string;
}

const LogBook = ({ fill = 'red' }: Props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={18}
        viewBox="0 0 14 18"
        fill={fill}
        className="tab_svg"
    >
        <path d="M1.96968 17.0303C1.51968 17.0303 1.13445 16.8701 0.813995 16.5496C0.49354 16.2292 0.333313 15.8439 0.333313 15.3939V2.30302C0.333313 1.85302 0.49354 1.46779 0.813995 1.14734C1.13445 0.826884 1.51968 0.666656 1.96968 0.666656H11.7879C12.2379 0.666656 12.6231 0.826884 12.9435 1.14734C13.264 1.46779 13.4242 1.85302 13.4242 2.30302V15.3939C13.4242 15.8439 13.264 16.2292 12.9435 16.5496C12.6231 16.8701 12.2379 17.0303 11.7879 17.0303H1.96968ZM1.96968 15.3939H11.7879V2.30302H10.1515V8.03029L8.10604 6.80302L6.06059 8.03029V2.30302H1.96968V15.3939Z" />
    </svg>
);
export default LogBook;
