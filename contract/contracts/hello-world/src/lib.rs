#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol, Vec, Address, token, BytesN};

#[contract]
pub struct HelloWorld;

#[contractimpl]
impl HelloWorld {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        let mut vec = Vec::new(&env);
        
        // Get stored message or default to "Hello"
        let message = env.storage().persistent().get(&symbol_short!("MESSAGE"))
            .unwrap_or(symbol_short!("Hello"));
        
        vec.push_back(message);
        vec.push_back(to);
        vec
    }

    pub fn update_message(
        env: Env,
        caller: Address,
        new_message: Symbol
    ) {
        // Store new message in persistent storage
        env.storage().persistent().set(&symbol_short!("MESSAGE"), &new_message);
    }
}
