export default function uniqueId() {
  return (
    Math.random().toString(35).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
