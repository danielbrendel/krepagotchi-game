<?php

/**
 * This class extends the base model class and represents your associated table
 */ 
class Letters extends \Asatru\Database\Model {
    /**
     * @return mixed
     * @throws \Exception
     */
    public static function pick()
    {
        try {
            $token = md5($_SERVER['REMOTE_ADDR']);

            if (Actions::today($token, 'pick')) {
                throw new \Exception('User already picked a letter today');
            }

            $item = static::raw('SELECT * FROM `@THIS` WHERE approved = TRUE AND assigned = FALSE AND token <> ? ORDER BY RAND() LIMIT 1', [$token])->first();
            if ($item) {
                static::raw('UPDATE `@THIS` SET assigned = TRUE WHERE id = ?', [$item->get('id')]);

                Actions::add($token, 'pick');

                return $item;
            }

            return null;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $pet
     * @param $message
     * @return void
     * @throws \Exception
     */
    public static function add($pet, $message)
    {
        try {
            $token = md5($_SERVER['REMOTE_ADDR']);

            if (Actions::today($token, 'add')) {
                throw new \Exception('User already added a letter today');
            }

            static::raw('INSERT INTO `@THIS` (token, pet, content, approved, assigned) VALUES(?, ?, ?, FALSE, FALSE)', [$token, $pet, $message]);

            Actions::add($token, 'add');
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * @param $type
     * @return bool
     * @throws \Exception
     */
    public static function check($type)
    {
        try {
            $token = md5($_SERVER['REMOTE_ADDR']);

            return !Actions::today($token, $type);
        } catch (\Exception $e) {
            throw $e;
        }
    }
}