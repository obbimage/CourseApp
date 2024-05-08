import parse from 'html-react-parser';
 export default function convertStringHtml(str) {
    return parse(str);
}
