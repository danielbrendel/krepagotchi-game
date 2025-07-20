<?php

/*
    Asatru PHP - Model
*/

/**
 * This class extends the base model class and represents your associated table
 */ 
class Actions extends \Asatru\Database\Model {
    /**
     * @param $token
     * @param $type
     * @return void
     * @throws \Exception
     */
    public static function add($token, $type)
    {
        try {
            static::raw('INSERT INTO `@THIS` (token, type) VALUES(?, ?)', [$token, $type]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $token
     * @param $type
     * @return bool
     * @throws \Exception
     */
    public static function today($token, $type)
    {
        try {
            $today = date('Y-m-d');

            $item = static::raw('SELECT * FROM `@THIS` WHERE token = ? AND type = ? AND DATE(created_at) = ? LIMIT 1', [$token, $type, $today])->first();
            if ($item) {
                return true;
            }

            return false;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}