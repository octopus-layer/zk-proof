import { Field, ZkProgram, Provable, Poseidon } from 'o1js';

export const Whistle = ZkProgram({
    name: 'whistle',
    publicInput: Provable.Array(Field, 10),
    publicOutput: Field,
  
    methods: {
      baseCase: {
        privateInputs: [Field, Field, Field],
  
        method(
          listOfPeople: Field[],
          identifier: Field, passkey: Field, message: Field
        ): Field {
          const key = Poseidon.hash([identifier, passkey]);
          
          let verifiedCount: Field = Field(0);

          for (let i = 0; i < 10; i++)
            verifiedCount = verifiedCount.add(Provable.if(
              listOfPeople[i].equals(key),
              Field(1),
              Field(0)
            ));

          verifiedCount.assertEquals(Field(1));

          return message;
        }
      }
    }
  }
);

const compileWhistle = async () => (await Whistle.compile()).verificationKey;
export const verificationKey = compileWhistle();

export class WhistleProof extends ZkProgram.Proof(Whistle) {};