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
    public static function maximum($token, $type)
    {
        try {
            $today = date('Y-m-d');

            $max = env('APP_MAXCOUNT_' . strtoupper($type), 1);

            $count = (int)static::raw('SELECT COUNT(*) AS `count` FROM `@THIS` WHERE token = ? AND type = ? AND DATE(created_at) = ?', [$token, $type, $today])->first()->get('count');
            if ($count >= $max) {
                return true;
            }

            return false;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}