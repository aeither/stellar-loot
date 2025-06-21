#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol, Vec};

#[contract]
pub struct HelloWorld;

#[contractimpl]
impl HelloWorld {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        let mut vec = Vec::new(&env);
        vec.push_back(symbol_short!("Hello"));
        vec.push_back(to);
        vec
    }
}
