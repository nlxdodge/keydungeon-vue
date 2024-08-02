
export const mixins = {
  methods: {
    toUpperCaseFirst(input: string) {
      return input.charAt(0).toUpperCase() + input.slice(1)
    },
    generateRandomString(specials: boolean = true, size: number = 64) {
      size = size <= 64 ? 64 : size
      let line = ''
      const charsetSpecial = '~!@#$%&*?<>|(){}[]'
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const finalCharset = specials ? charset + charsetSpecial : charset
      for (let a = 0; a < size; a++) {
        line += finalCharset.charAt(Math.floor(Math.random() * finalCharset.length))
      }
      return line
    }
  }
}


