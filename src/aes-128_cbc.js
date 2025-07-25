const SBOX = Uint8Array.from([
  0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
  0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
  0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
  0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
  0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
  0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
  0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
  0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
  0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
  0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
  0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
  0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
  0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
  0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
  0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
  0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16
]);

const INV_SBOX = Uint8Array.from([
  0x52,0x09,0x6A,0xD5,0x30,0x36,0xA5,0x38,0xBF,0x40,0xA3,0x9E,0x81,0xF3,0xD7,0xFB,
  0x7C,0xE3,0x39,0x82,0x9B,0x2F,0xFF,0x87,0x34,0x8E,0x43,0x44,0xC4,0xDE,0xE9,0xCB,
  0x54,0x7B,0x94,0x32,0xA6,0xC2,0x23,0x3D,0xEE,0x4C,0x95,0x0B,0x42,0xFA,0xC3,0x4E,
  0x08,0x2E,0xA1,0x66,0x28,0xD9,0x24,0xB2,0x76,0x5B,0xA2,0x49,0x6D,0x8B,0xD1,0x25,
  0x72,0xF8,0xF6,0x64,0x86,0x68,0x98,0x16,0xD4,0xA4,0x5C,0xCC,0x5D,0x65,0xB6,0x92,
  0x6C,0x70,0x48,0x50,0xFD,0xED,0xB9,0xDA,0x5E,0x15,0x46,0x57,0xA7,0x8D,0x9D,0x84,
  0x90,0xD8,0xAB,0x00,0x8C,0xBC,0xD3,0x0A,0xF7,0xE4,0x58,0x05,0xB8,0xB3,0x45,0x06,
  0xD0,0x2C,0x1E,0x8F,0xCA,0x3F,0x0F,0x02,0xC1,0xAF,0xBD,0x03,0x01,0x13,0x8A,0x6B,
  0x3A,0x91,0x11,0x41,0x4F,0x67,0xDC,0xEA,0x97,0xF2,0xCF,0xCE,0xF0,0xB4,0xE6,0x73,
  0x96,0xAC,0x74,0x22,0xE7,0xAD,0x35,0x85,0xE2,0xF9,0x37,0xE8,0x1C,0x75,0xDF,0x6E,
  0x47,0xF1,0x1A,0x71,0x1D,0x29,0xC5,0x89,0x6F,0xB7,0x62,0x0E,0xAA,0x18,0xBE,0x1B,
  0xFC,0x56,0x3E,0x4B,0xC6,0xD2,0x79,0x20,0x9A,0xDB,0xC0,0xFE,0x78,0xCD,0x5A,0xF4,
  0x1F,0xDD,0xA8,0x33,0x88,0x07,0xC7,0x31,0xB1,0x12,0x10,0x59,0x27,0x80,0xEC,0x5F,
  0x60,0x51,0x7F,0xA9,0x19,0xB5,0x4A,0x0D,0x2D,0xE5,0x7A,0x9F,0x93,0xC9,0x9C,0xEF,
  0xA0,0xE0,0x3B,0x4D,0xAE,0x2A,0xF5,0xB0,0xC8,0xEB,0xBB,0x3C,0x83,0x53,0x99,0x61,
  0x17,0x2B,0x04,0x7E,0xBA,0x77,0xD6,0x26,0xE1,0x69,0x14,0x63,0x55,0x21,0x0C,0x7D
]);

// Round constant for key expansion
const RCON = Uint8Array.from([
  0x00,
  0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36
]);

function xtime(byte) {
  return ((byte << 1) ^ ((byte & 0x80) ? 0x1b : 0x00)) & 0xFF;
}
function mul(a, b) {
  let result = 0;
  let tempA = a;
  let tempB = b;
  for (let i = 0; i < 8; i++) {
    if (tempB & 1) result ^= tempA;
    let hi = tempA & 0x80;
    tempA = (tempA << 1) & 0xFF;
    if (hi) tempA ^= 0x1b;
    tempB >>= 1;
  }
  return result;
}

function keyExpansion(keyBytes) {
  if (!(keyBytes instanceof Uint8Array)) keyBytes = Uint8Array.from(keyBytes);
  if (keyBytes.length !== 16) throw new Error("Key must be 16 bytes");
  const expandedKey = new Uint8Array(176);
  expandedKey.set(keyBytes, 0);
  let bytesGenerated = 16;
  let rconIter = 1;
  const temp = new Uint8Array(4);
  while (bytesGenerated < 176) {
    for (let i = 0; i < 4; i++) temp[i] = expandedKey[bytesGenerated - 4 + i];
    if (bytesGenerated % 16 === 0) {
      // rotate
      const t0 = temp[0];
      temp[0] = temp[1];
      temp[1] = temp[2];
      temp[2] = temp[3];
      temp[3] = t0;
      // sub
      temp[0] = SBOX[temp[0]];
      temp[1] = SBOX[temp[1]];
      temp[2] = SBOX[temp[2]];
      temp[3] = SBOX[temp[3]];
      temp[0] ^= RCON[rconIter++];
    }
    for (let i = 0; i < 4; i++) {
      expandedKey[bytesGenerated] = expandedKey[bytesGenerated - 16] ^ temp[i];
      bytesGenerated++;
    }
  }
  return expandedKey;
}

function addRoundKey(state, roundKey) {
  for (let i = 0; i < 16; i++) state[i] ^= roundKey[i];
}
function subBytes(state) {
  for (let i = 0; i < 16; i++) state[i] = SBOX[state[i]];
}
function invSubBytes(state) {
  for (let i = 0; i < 16; i++) state[i] = INV_SBOX[state[i]];
}
function shiftRows(state) {
  const tmp = new Uint8Array(16);
  tmp[0]=state[0]; tmp[4]=state[4]; tmp[8]=state[8]; tmp[12]=state[12];
  tmp[1]=state[5]; tmp[5]=state[9]; tmp[9]=state[13]; tmp[13]=state[1];
  tmp[2]=state[10]; tmp[6]=state[14]; tmp[10]=state[2]; tmp[14]=state[6];
  tmp[3]=state[15]; tmp[7]=state[3]; tmp[11]=state[7]; tmp[15]=state[11];
  state.set(tmp);
}
function invShiftRows(state) {
  const tmp = new Uint8Array(16);
  tmp[0]=state[0]; tmp[4]=state[4]; tmp[8]=state[8]; tmp[12]=state[12];
  tmp[1]=state[13]; tmp[5]=state[1]; tmp[9]=state[5]; tmp[13]=state[9];
  tmp[2]=state[10]; tmp[6]=state[14]; tmp[10]=state[2]; tmp[14]=state[6];
  tmp[3]=state[7]; tmp[7]=state[11]; tmp[11]=state[15]; tmp[15]=state[3];
  state.set(tmp);
}
function mixColumns(state) {
  for (let col = 0; col < 4; col++) {
    const i = 4*col;
    const a0=state[i], a1=state[i+1], a2=state[i+2], a3=state[i+3];
    const r0 = (xtime(a0) ^ (xtime(a1)^a1) ^ a2 ^ a3) & 0xFF;
    const r1 = (a0 ^ xtime(a1) ^ (xtime(a2)^a2) ^ a3) & 0xFF;
    const r2 = (a0 ^ a1 ^ xtime(a2) ^ (xtime(a3)^a3)) & 0xFF;
    const r3 = ((xtime(a0)^a0) ^ a1 ^ a2 ^ xtime(a3)) & 0xFF;
    state[i]=r0; state[i+1]=r1; state[i+2]=r2; state[i+3]=r3;
  }
}
function invMixColumns(state) {
  for (let col = 0; col < 4; col++) {
    const i=4*col;
    const a0=state[i], a1=state[i+1], a2=state[i+2], a3=state[i+3];
    const r0 = (mul(a0,0x0e) ^ mul(a1,0x0b) ^ mul(a2,0x0d) ^ mul(a3,0x09)) & 0xFF;
    const r1 = (mul(a0,0x09) ^ mul(a1,0x0e) ^ mul(a2,0x0b) ^ mul(a3,0x0d)) & 0xFF;
    const r2 = (mul(a0,0x0d) ^ mul(a1,0x09) ^ mul(a2,0x0e) ^ mul(a3,0x0b)) & 0xFF;
    const r3 = (mul(a0,0x0b) ^ mul(a1,0x0d) ^ mul(a2,0x09) ^ mul(a3,0x0e)) & 0xFF;
    state[i]=r0; state[i+1]=r1; state[i+2]=r2; state[i+3]=r3;
  }
}

function encryptBlock(blockBytes, expandedKey) {
  const state = new Uint8Array(16);
  state.set(blockBytes);
  addRoundKey(state, expandedKey.subarray(0,16));
  for (let round=1; round<=9; round++) {
    subBytes(state);
    shiftRows(state);
    mixColumns(state);
    addRoundKey(state, expandedKey.subarray(16*round, 16*round+16));
  }
  subBytes(state);
  shiftRows(state);
  addRoundKey(state, expandedKey.subarray(160,176));
  return state;
}

function decryptBlock(blockBytes, expandedKey) {
  const state = new Uint8Array(16);
  state.set(blockBytes);
  addRoundKey(state, expandedKey.subarray(160,176));
  invShiftRows(state);
  invSubBytes(state);
  for (let round=9; round>=1; round--) {
    addRoundKey(state, expandedKey.subarray(16*round, 16*round+16));
    invMixColumns(state);
    invShiftRows(state);
    invSubBytes(state);
  }
  addRoundKey(state, expandedKey.subarray(0,16));
  return state;
}

function pkcs7Pad(dataBytes) {
  const blockSize = 16;
  const padLen = blockSize - (dataBytes.length % blockSize) || blockSize;
  const padded = new Uint8Array(dataBytes.length + padLen);
  padded.set(dataBytes, 0);
  for (let i = dataBytes.length; i < padded.length; i++) padded[i] = padLen;
  return padded;
}

function pkcs7Unpad(paddedBytes) {
  if (paddedBytes.length === 0 || paddedBytes.length % 16 !== 0) {
    throw new Error("Invalid padded data length");
  }
  const padLen = paddedBytes[paddedBytes.length - 1];
  if (padLen < 1 || padLen > 16) throw new Error("Invalid padding");
  for (let i = paddedBytes.length - padLen; i < paddedBytes.length; i++) {
    if (paddedBytes[i] !== padLen) throw new Error("Invalid padding bytes");
  }
  return paddedBytes.subarray(0, paddedBytes.length - padLen);
}

function xorBlocks(a, b) {
  const out = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) out[i] = a[i] ^ b[i];
  return out;
}

function generateIV() {
  const iv = new Uint8Array(16);
  for (let i = 0; i < iv.length; i++) {
    iv[i] = Math.floor(Math.random() * 256);
  }
  return iv;
}

function encrypt(keyBytes, plaintextBytes) {
  if (!(plaintextBytes instanceof Uint8Array)) plaintextBytes = Uint8Array.from(plaintextBytes);

  const iv = generateIV();
  const expandedKey = keyExpansion(keyBytes);
  const padded      = pkcs7Pad(plaintextBytes);
  const cipherTxt   = new Uint8Array(16 + padded.length);

  cipherTxt.set(iv, 0);
  let prev = iv;
  for (let off = 0; off < padded.length; off += 16) {
    const block = padded.subarray(off, off + 16);
    const xored = xorBlocks(block, prev); // chain
    const enc   = encryptBlock(xored, expandedKey);
    cipherTxt.set(enc, 16 + off);
    prev = enc;
  }
  return cipherTxt;
}

function decrypt(keyBytes, cipherBytes) {
  if (!(cipherBytes instanceof Uint8Array)) cipherBytes = Uint8Array.from(cipherBytes);
  if (cipherBytes.length < 32 || cipherBytes.length % 16 !== 0) {
    throw new Error("cipherTxt must be at least one block plus IV (32 bytes) and a multiple of 16");
  }

  const expandedKey = keyExpansion(keyBytes);

  const iv               = cipherBytes.subarray(0, 16);
  const ciphertextBlocks = cipherBytes.subarray(16);
  const plainTxt         = new Uint8Array(ciphertextBlocks.length);

  let prevCipherBlock = iv;
  for (let offset = 0; offset < ciphertextBlocks.length; offset += 16) {
    const cipherBlock = ciphertextBlocks.subarray(offset, offset + 16);
    const decrypted   = decryptBlock(cipherBlock, expandedKey);
    // unchain
    const plainBlock  = xorBlocks(decrypted, prevCipherBlock);
    plainTxt.set(plainBlock, offset);
    prevCipherBlock = cipherBlock;
  }

  return pkcs7Unpad(plainTxt);
}

module.exports = {
  decrypt,
  encrypt
}