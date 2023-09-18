export function validateCPF(rawCpf: string | undefined) {
   if (!rawCpf) return true
   const onlyNumbersCPF = rawCpf.replace(/\D/g, '')
   if (isInvalidLength(onlyNumbersCPF)) return false
   if (allDigitsTheSame(onlyNumbersCPF)) return false
 
   const firstDigit = calculateDigit(onlyNumbersCPF, 10)
   const secondDigit = calculateDigit(onlyNumbersCPF, 11)
   const actualDigit = extractDigits(onlyNumbersCPF)
   const validatedDigit = `${firstDigit}${secondDigit}`
   const isValid = actualDigit === validatedDigit
   if (isValid) return true
   return false
 }
 
 function calculateDigit(cpf: string, factor: number) {
   let total = 0
   for (const digit of cpf) {
     if (factor > 1) total += parseInt(digit) * factor--
   }
   const rest = total % 11
   return rest < 2 ? 0 : 11 - rest
 }
 
 function isInvalidLength(cpf: string) {
   return cpf.length !== 11
 }
 
 function allDigitsTheSame(cpf: string) {
   const firstDigit = cpf[0]
   // return [...cpf].every(digit => digit === firstDigit)
   return cpf.split('').every(digit => digit === firstDigit)
 }
 
 function extractDigits(cpf: string) {
   return cpf.slice(9)
 }
 