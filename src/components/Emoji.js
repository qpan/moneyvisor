function Emoji({ unicode }) {
  const emoji = String.fromCodePoint(parseInt(unicode, 16));
  return (
    <span role="img" aria-label={emoji}>{emoji}</span>
  );
}

export default Emoji;