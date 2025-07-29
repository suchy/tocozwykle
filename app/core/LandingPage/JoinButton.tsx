export function JoinButton() {
  return (
    <a
      href='#powiadom-mnie-o-starcie'
      title='Powiadom mnie o starcie usługi'
      class='inline-block hover:bg-emerald-800 text-white px-8 py-4 rounded-sm uppercase bg-[#24B67B] cursor-pointer text-lg md:tracking-wider'
      onclick="document.getElementById('email').focus(); return false;"
    >
      Powiadom mnie o starcie
    </a>
  );
}
