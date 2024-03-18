export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function generateRandomString(specials: boolean = true, size: number = 32) {
  size = size <= 32 ? 32 : size
  let line = ''
  const charsetSpecial = '~!@#$%&*?<>|(){}[]'
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const finalCharset = specials ? charset + charsetSpecial : charset
  for (let a = 0; a < size; a++) {
    line += finalCharset.charAt(Math.floor(Math.random() * finalCharset.length))
  }
  return line
}
