import algosdk, { type ABIValue } from 'algosdk'
import type { IQuestion } from 'biatec-learn'
import { Buffer } from 'buffer'

const parseBiatecLearnBox = (input: Uint8Array) => {
  /*
  
    assetId: bigint;
    count: bigint;
    reward: bigint;
    index: bigint;
    title: string;
    text: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    answer5: string;
  */
  // 0000000000000000 0000000000000001 0000000000002710 0000000000000001 002e 003e 0044 0049 004d 004f 0051 000e 4669727374207175657374696f6e00 04 5465737400 03 59657300 02 4e6f00 00 00 00 0000
  const out = algosdk.ABIType.from(
    '(uint64,uint64,uint64,uint64,string,string,string,string,string,string,string)'
  ).decode(input) as ABIValue[]

  const ret: IQuestion = {
    assetId: BigInt(out[0].valueOf() as number | bigint),
    count: BigInt(out[1].valueOf() as number | bigint),
    reward: BigInt(out[2].valueOf() as number | bigint),
    index: BigInt(out[3].valueOf() as number | bigint),
    title: out[4].valueOf().toString(),
    text: out[5].valueOf().toString(),
    answer1: out[6].valueOf().toString(),
    answer2: out[7].valueOf().toString(),
    answer3: out[8].valueOf().toString(),
    answer4: out[9].valueOf().toString(),
    answer5: out[10].valueOf().toString()
  }
  return ret
}
export default parseBiatecLearnBox
