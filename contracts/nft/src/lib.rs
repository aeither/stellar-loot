    #![no_std]

    /*
    ___              _               _  _ ___ _____ 
    / __| ___ _ _ ___| |__  __ _ _ _ | \| | __|_   _|
    \__ \/ _ \ '_/ _ \ '_ \/ _` | ' \| .` | _|  | |  
    |___/\___/_| \___/_.__/\__,_|_||_|_|\_|_|   |_|    
        - Released under 3N consideration -
                - Not Tested
                - Not Audited
                - Not Safe For Production
    */

    use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Bytes, String, Env, Vec};

    #[contract]
    pub struct SorobanNFT;

    #[contracttype]
    pub enum DataKey {
        Owner(i128),
        TokenCount,
        TokenOwner(Address),
        Approvals(i128),
    }

    #[contractimpl]
    impl SorobanNFT {
        //const SUPPLY: i128 = 1000;
        const NAME: &'static str = "SorobanNFT";
        const SYMBOL: &'static str = "SBN";
        const METADATA: &'static str = "https://ipfs.io/ipfs/QmegWR31kiQcD9S2katTXKxracbAgLs2QLBRGruFW3NhXC";
        const IMAGE: &'static str = "https://ipfs.io/ipfs/QmeRHSYkR4aGRLQXaLmZiccwHw7cvctrB211DzxzuRiqW6";

        pub fn owner_of(env: Env, token_id: i128) -> Address {
            env.storage().persistent().get(&DataKey::Owner(token_id)).unwrap_or_else(|| {
                Address::from_string_bytes(&Bytes::from_slice(&env, &[0; 32]))
            })
        }

        pub fn tokens_of(env: Env, owner: Address) -> Vec<i128> {
            let owners_tokens = env.storage().persistent().get::<DataKey, Vec<i128>>(&DataKey::TokenOwner(owner.clone()))
                .unwrap_or_else(|| Vec::new(&env));

            owners_tokens
        }

        pub fn name(env: Env) -> String {
            String::from_str(&env, Self::NAME)
        }

        pub fn symbol(env: Env) -> String {
            String::from_str(&env, Self::SYMBOL)
        }

        pub fn token_uri(env: Env) -> String {
            String::from_str(&env, Self::METADATA)
        }

        pub fn token_image(env: Env) -> String {
            String::from_str(&env, Self::IMAGE)
        }

        pub fn is_approved(env: Env, operator: Address, token_id: i128) -> bool {
            let key = DataKey::Approvals(token_id);
            let approvals = env.storage().persistent().get::<DataKey, Vec<Address>>(&key).unwrap_or_else(|| Vec::new(&env));
            approvals.contains(&operator)
        }

        pub fn transfer(env: Env, owner: Address, to: Address, token_id: i128) {
            owner.require_auth();
            let actual_owner = Self::owner_of(env.clone(), token_id);
            if owner == actual_owner {
                env.storage().persistent().set(&DataKey::Owner(token_id), &to);
                env.storage().persistent().remove(&DataKey::Approvals(token_id));
                env.events().publish((symbol_short!("Transfer"),), (owner, to, token_id));
            } else {
                panic!("Not the token owner");
            }
        }

        pub fn mint(env: Env, to: Address) {
            // Retrieve the current token count
           // let token_count: i128 = env.storage().persistent().get(&DataKey::TokenCount).unwrap_or(0);
            //let new_token_id = token_count; // Increment the token count to generate a new token ID

            let token_id: u64 = env.prng().gen_range(1..=3); // For testing purposes, we use a random number between 1 and 3
            let new_token_id = i128::from(token_id);

            // Retrieve the current list of owners for the new token ID
            let mut owners_tokens = env.storage().persistent().get::<DataKey, Vec<i128>>(&DataKey::TokenOwner(to.clone()))
                .unwrap_or_else(|| Vec::new(&env));
        
            // Add the new owner to the list
            owners_tokens.push_back(new_token_id.clone());
        
            // Update the storage with the new list of owners
            //env.storage().persistent().set(&DataKey::Owner(new_token_id), &owners);
        
            // Update the token count in storage
            env.storage().persistent().set(&DataKey::TokenOwner(to.clone()), &owners_tokens);
        
            // Emit an event for the mint operation
            env.events().publish((symbol_short!("Mint"),), (to, new_token_id));
        }

        pub fn approve(env: Env, owner: Address, to: Address, token_id: i128) {
            owner.require_auth();
            let actual_owner = Self::owner_of(env.clone(), token_id);
            if owner == actual_owner {
                let key = DataKey::Approvals(token_id);
                let mut approvals = env.storage().persistent().get::<DataKey, Vec<Address>>(&key).unwrap_or_else(|| Vec::new(&env));
                if !approvals.contains(&to) {
                    approvals.push_back(to.clone());
                    env.storage().persistent().set(&key, &approvals);
                    env.events().publish((symbol_short!("Approval"),), (owner, to, token_id));
                }
            } else {
                panic!("Not the token owner");
            }
        }

        pub fn transfer_from(env: Env, spender: Address, from: Address, to: Address, token_id: i128) {
            spender.require_auth();
            let actual_owner = Self::owner_of(env.clone(), token_id);
            if from != actual_owner {
                panic!("From not owner");
            }
            let key = DataKey::Approvals(token_id);
            let approvals = env.storage().persistent().get::<DataKey, Vec<Address>>(&key).unwrap_or_else(|| Vec::new(&env));
            if !approvals.contains(&spender) {
                panic!("Spender is not approved for this token");
            }
            env.storage().persistent().set(&DataKey::Owner(token_id), &to);
            env.storage().persistent().remove(&DataKey::Approvals(token_id));
            env.events().publish((symbol_short!("Transfer"),), (from, to, token_id));
        }
    }

    //mod test;
