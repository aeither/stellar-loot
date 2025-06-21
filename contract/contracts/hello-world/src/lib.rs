#![no_std]
use soroban_sdk::{contractimpl, symbol, Env, Symbol, Vec};

pub struct HelloWorld;

#[contractimpl]
impl HelloWorld {
    pub fn hello(env: Env, to: Symbol) -> Vec<Symbol> {
        let mut vec = Vec::new(&env);
        vec.push_back(symbol!("Hello"));
        vec.push_back(to);
        vec
    }
}
